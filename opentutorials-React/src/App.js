import React, { Component } from 'react';
import './App.css';
import Subject from './components/Subject';
import TOC from './components/TOC';
import Control from './components/Control';
import ReadContents from './components/ReadContents';
import CreateContents from './components/CreateContents';
import UpdateContents from './components/UpdateContents';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "welcome",
      max_content_id: 3,
      selected_content_id: 2,
      Subject: { title: 'WEB', sub: "World wide Web!" },
      welcome: { title: 'Welcome', desc: 'Hello, React!!' },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is information" },
        { id: 2, title: "CSS", desc: "Css is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactives" }
      ]
    }
  }

  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id == this.state.selected_content_id) {
        return data;
        break;
      }
      i += 1;
    }
  }

  getContent() {
    var _title, _desc, _article = null;

    if (this.state.mode == 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContents
        title={_title}
        desc={_desc}
      >
      </ReadContents>;

    } else if (this.state.mode == 'read') {
      var _contents = this.getReadContent();
      _article = <ReadContents
        title={_contents.title}
        desc={_contents.desc}
      >
      </ReadContents>;

    } else if (this.state.mode == 'create') {
      _article = <CreateContents
        onSubmit={function (_title, _desc) {
          var newContents = Array.from(this.state.contents);
          this.max_content_id = newContents[newContents.length - 1].id + 1;
          newContents.push({
            id: this.max_content_id, title: _title, desc: _desc
          })
          this.setState({
            contents: newContents,
            mode: 'read'
          })
        }.bind(this)}
      >
      </CreateContents>;

    } else if (this.state.mode == 'update') {
      var _content = this.getReadContent();
      _article = <UpdateContents
        data={_content}
        onSubmit={function (_id, _title, _desc) {
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while (i < _contents.length) {
            if (_contents[i].id == _id) {
              _contents[i] = { id: _id, title: _title, desc: _desc }
              break;
            }
            i += 1;
          }

          this.setState({
            contents: _contents,
            mode: 'read'
          });

        }.bind(this)}>
      </UpdateContents>
    }
    return _article;
  }

  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.Subject.title}
          sub={this.state.Subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
          }.bind(this)}>
        </Subject>

        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: 'read',
              selected_content_id: id
            });
          }.bind(this)}
          data={this.state.contents}>
        </TOC>

        <Control
          onChangeMode={function (_mode) {
            if (_mode === 'delete') {
              if (window.confirm("Really?")) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (this.state.selected_content_id == _contents[i].id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i += 1;
                }
                this.setState({
                  contents: _contents,
                  mode: 'welcome'
                });
                alert("deleted!");
              }
            } else {
              this.setState({
                mode: _mode
              });
            }
          }.bind(this)}>
        </Control>

        {this.getContent()}
      </div>
    );
  }
}

export default App;