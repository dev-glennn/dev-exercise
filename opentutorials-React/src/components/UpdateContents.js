import React, { Component } from 'react';

class UpdateContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id,
            title: this.props.data.title,
            desc: this.props.data.desc
        }
        this.inputForHandler = this.inputForHandler.bind(this);
    }

    inputForHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <article>
                <h2>Update</h2>

                <form
                    action="/update_process"
                    method="post"
                    onSubmit={function (e) {
                        e.preventDefault();
                        this.props.onSubmit(
                            e.target.id.value,
                            e.target.title.value,
                            e.target.desc.value
                        );
                    }.bind(this)}>

                    <input type="hidden" name="id" value={this.state.id}></input>

                    <p>
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            value={this.state.title}
                            onChange={this.inputForHandler}>
                        </input>
                    </p>

                    <p>
                        <textarea
                            type="text"
                            name="desc"
                            placeholder="description"
                            value={this.state.desc}
                            onChange={this.inputForHandler}
                        ></textarea>
                    </p>

                    <p>
                        <input type="submit" value="UPDATE!"></input>
                    </p>

                </form>
            </article>
        );
    }
}

export default UpdateContents;