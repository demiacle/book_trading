
import React, { Component } from 'react';
import './Nav.css';

class Books extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><a href="/">
                        <div>home</div></a></li>
                    <li><a href="/books">
                        <div>books</div></a></li>
                    <li className="right">
                        <form action="/search">
                            <input type="text" placeholder="Search.." name="search" />
                            <button type="submit">search</button>
                        </form>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Books;

