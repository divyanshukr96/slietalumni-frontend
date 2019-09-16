import React, {useEffect, useState} from 'react';
import {withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Card, Popover} from "antd";
import axios from "axios";


const styles = theme => ({
    card: {
        '& > :first-child > div div': {
            padding: `8px 0`,
        }
    },
    list: {
        '& > :last-child': {
            marginTop: 0,
        },
    },
    meta: {
        '& div:not(:last-child)': {
            marginBottom: 0,
        },
        '& ~ ul': {
            marginTop: `0 !important`,
        }
    },

    scroll: {
        display: 'flex',
        overflow: 'scroll hidden',
        '& *': {
            marginRight: 4,
            // maxHeight: 180,
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
            backgroundColor: '#F5F5F5',
            borderRadius: 8,
        },
        '&::-webkit-scrollbar': {
            height: 8,
            backgroundColor: '#F5F5F5',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#AAA',
            borderRadius: 8,
            backgroundImage: '-webkit-linear-gradient(90deg, rgba(0, 0, 0, .2) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, .2) 50%, rgba(0, 0, 0, .2) 75%, transparent 75%, transparent)'
        },
    }

});


const FeaturedAlumni = ({classes}) => {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);
    const {card, meta, scroll} = classes;

    async function fetchUrl() {
        const {data} = await axios.get("api/public/featured-alumni");
        if (data.data) setFeatured(data.data);
    }

    useEffect(() => {
        fetchUrl().then(r => setLoading(false));
    }, []);

    const description = (alumni) => (alumni.designation ? alumni.designation + ", " : "") + (alumni.organisation || "");

    return (
        <>
            <Card
                headStyle={{minHeight: 'auto'}}
                bodyStyle={{padding: 0}}
                className={card}
                loading={loading}
                title={'Featured Alumni'}
                extra={<Link to={'/featured-alumni'}>View All</Link>}
            >
                <div className={scroll}>
                    {featured.map((alumni, index) => (
                        <Popover
                            key={index}
                            align={{
                                points: ['cc', 'cc']
                            }}
                            content={<Card
                                style={{width: 220, margin: `-12px -16px`}}
                                bodyStyle={{padding: 8}}
                                cover={<img alt="example" src={alumni.image}/>}
                            >
                                <Card.Meta
                                    className={meta}
                                    title={alumni.name}
                                    description={`${description(alumni)}`}
                                />
                            </Card>}
                        >
                            <img height="140"
                                 src={alumni.image}
                                 style={{cursor: 'pointer', maxWidth: 180}}
                                 alt={alumni.name}
                            />
                        </Popover>
                    ))}
                </div>
            </Card>
        </>
    );
};


export default withStyles(styles)(FeaturedAlumni);