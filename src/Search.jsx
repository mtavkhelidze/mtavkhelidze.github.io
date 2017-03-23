import React from 'react';

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            str: '',
        };
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onReset = this.onReset.bind(this);
    }
    
    onClick() {
        console.log('Str: ', this.state.str);
    }
    
    onReset() {
        this.setState({
            str: '',
        });
    }
    
    onChange(event) {
        this.setState({
            str: event.target.value,
        });
    }
    
    render() {
        return (
            <div className="bookz-search">
                <div className="input-group">
                    <input type="text" className="form-control"
                           placeholder="Search for ISBN, title, or author"
                           required={true}
                           autoFocus={true}
                           value={this.state.str}
                           onChange={this.onChange}
                    />
                    {
                        this.state.str ? (
                        <div className="input-group-addon" onClick={this.onReset}>
                            <i className="fa fa-2x fa-remove" />
                        </div>
                        ) : null
                    }
                    <a className="input-group-addon"
                       onClick={this.onClick}>
                        <i className="fa fa-2x fa-search" />
                    </a>
                </div>
            </div>
        );
    };
}
