// @flow
import React, { Component } from 'react';
import './App.css';

const doc = {
  name: 'default.rd',
  version: '0',
  meta: {},
  filters: [
    {
      name: 'default',
      id: '0x00',
      rule: 'items => Object.keys(items).map(key => items[key])',
    },
    {
      name: 'marcos only',
      id: '0x01',
      rule:
        "items => Object.keys(items).map(key => items[key]).filter(item => item.creator.id === 'marcos')",
    },
    {
      name: 'sorted',
      id: '0x02',
      arrangement: ['b', 'a'],
    },
  ],

  views: [],
  items: {
    a: {
      title: 'ohai',
      creator: {
        id: 'marcos',
        version: '0',
      },
    },
    b: {
      title: 'get in the choppa',
      creator: {
        id: 'unknowwn',
        version: '1',
      },
    },
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilter: null,
      doc: { ...doc },
    };
  }

  state = {
    activeFilter: null,
  };

  render() {
    const { doc, activeFilter } = this.state;
    const defaultView = doc.filters[0];

    let currentFilterFn = items => Object.keys(items).map(key => items[key]);
    if (activeFilter !== null) {
      const selectedFilter = doc.filters.filter(view => view.id === activeFilter)[0];
      if (selectedFilter.rule && selectedFilter.rule.trim() !== '') {
        currentFilterFn = eval(selectedFilter.rule.trim());
      } else {
        currentFilterFn = docItems => selectedFilter.arrangement.map(id => docItems[id]);
      }
    }

    const shown = currentFilterFn(doc.items).length;
    const total = Object.keys(doc.items).length;

    return (
      <div className="App">
        <h1>{doc.name}</h1>
        <h2>filters</h2>
        <ul className="filter-list">
          {doc.filters.map(filter => (
            <FilterUI
              handlePick={this.setActiveFilter}
              filter={filter}
              isActive={filter.id === activeFilter}
              key={filter.id}
            />
          ))}
        </ul>
        <h3>
          items{' '}
          <small>
            {shown} visible / {total} total{' '}
          </small>
        </h3>
        <ul>
          {currentFilterFn(doc.items).map(item => (
            <DefaultItemView key={item.id} item={item} />
          ))}
        </ul>
      </div>
    );
  }

  setActiveFilter = activeFilter => () => this.setState({ activeFilter });
}

const DefaultItemView = ({ item: { title, id, meta, creator } }) => {
  return (
    <div>
      <p>
        <strong>{title}</strong>
      </p>
      <pre>{JSON.stringify({ title, id, meta, creator }, null, 2)}</pre>
    </div>
  );
};

const FilterUI = ({ handlePick, isActive, filter }) => {
  return (
    <li className="filter-item" onClick={handlePick(filter.id)}>
      <h3 className="filter-title">
        {isActive ? <strong>{filter.name}</strong> : filter.name}
      </h3>
    </li>
  );
};

export default App;
