import React from 'react';
import ReactDOM from 'react-dom';

import 'style.scss';
import { Bookz } from './Bookz';
import { Search } from './Search';

const Index = () => (
    <div className="bookz">
        <Bookz />
        <Search />
    </div>
);

ReactDOM.render(<Index />, document.getElementById('app'));
