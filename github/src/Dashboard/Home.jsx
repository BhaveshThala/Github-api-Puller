import React, { Component, Fragment } from 'react'
import axios from 'axios'
import './home.css'
import Progress from 'react-progressbar';
import Repository from './Repository';
class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            user: '',
            count: 0,
            repo: []
        }
    }

    setUser(event) {
        if (this.state.user.length <= 1) {
            this.setState({
                count: 0
            })
        }
        this.setState({
            user: event.target.value
        })
    }

    handler(event) {
        event.preventDefault()
        axios.get(`https://api.github.com/users/${this.state.user.split(" ").join("")}`)
            .then((res) => {
                this.setState({
                    data: res.data,
                    count: 100
                })
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    repos(event) {
        axios.get(this.state.data['repos_url'])
            .then((res) => {
                this.setState({
                    repo: res.data,
                })
                window.scrollTo(0, 600,'smooth');
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="row" style={{ backgroundColor: 'whitesmoke', padding: '0px' }}>
                        <h1 style={{ textAlign: 'center', padding: '10px' }}>Github User Information</h1>
                    </div>
                </div>
                <div className="container-fluid" style={{ padding: '20px' }}>
                    <div className="row">
                        <div className="col-sm-4 userdata">
                            <form className="form-group" onSubmit={this.handler.bind(this)}>
                                <h3 htmlFor="user">Enter Username:</h3>
                                <input type="text" onChange={this.setUser.bind(this)} className="form-control" name="user" required="required" placeholder="Enter github user name.." />
                                <br />
                                <button type="submit" className="btn btn-primary">Search..</button>
                                <Progress completed={this.state.count} style={{ marginTop: '10px' }}></Progress>
                            </form>
                            <button className="btn btn-default" style={{ marginBottom: '10px' }} onClick={this.repos.bind(this)}>View Repository</button>
                        </div>
                        <div className="col-sm-4">

                        </div>
                        <div className="col-sm-4 userimage thumbnail">
                            <img src={this.state.data['avatar_url']} alt="waiting for data" />
                            <a href={this.state.data['html_url']} rel="noreferrer" target="_blank">View Profile</a>
                            <h2>{this.state.data['login']}</h2>
                            <h5>{this.state.data['name']}</h5>
                            <label>Location:</label>
                            <p>{this.state.data['location']}</p>
                            <label>Followers:</label>
                            <p>{this.state.data['followers']}</p>
                            <label>Following:</label>
                            <p>{this.state.data['following']}</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <label style={{ fontSize: 'xx-large',padding:'15px'}}>Repositories</label>
                        <div>
                            {this.state.repo.map((demo) => <Repository name={demo.name} path={demo.html_url}></Repository>)}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Home
