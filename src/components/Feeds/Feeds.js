import React, {Component} from 'react';
import FeedsCard from "components/Feeds/FeedsCard";
import axios from 'axios'

class Feeds extends Component {

    state = {
        posts: ['k']
    }

    componentWillMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts/1').then(res => {
            // this.setState({posts: res.data})
        })
    }

    render() {
        return (
            <div>
                {this.state.posts.map((post, index) => <FeedsCard key={index} post={post}/>)}

            </div>
        );
    }
}

export default Feeds;