import React from 'react';
import {makeStyles} from "@material-ui/core";
import {Card, Popover} from "antd";
import Scrollable from "../components/Scrollable";

import NCR from 'assets/chapter/ncr.jpg'
import Bangalore from 'assets/chapter/banglore.jpeg'
import Canada from 'assets/chapter/canada.jpg'
import Chandigarh from 'assets/chapter/chd.jpg'
import Bihar from 'assets/chapter/bihar-chapter.jpeg'


const useStyles = makeStyles(theme => ({
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
        marginBottom: `4px !important`,
        '& h4': {
            marginBottom: `4px !important`,
        },
        '& ~ ul': {
            marginTop: `0 !important`,
        }
    }
}));

const data = [
    {
        image: Bihar,
        title: 'Bihar',
    },
    {
        image: NCR,
        title: 'NCR',
    },
    {
        image: Chandigarh,
        title: 'Chandigarh',
    },
    {
        image: Canada,
        title: 'Canada',
    },
    {
        image: Bangalore,
        title: 'Bangalore',
    },

];

function Chapters() {
    const {card, meta} = useStyles();
    return (
        <>
            <Card
                style={{marginBottom: 8}}
                headStyle={{minHeight: 'auto'}}
                bodyStyle={{padding: 0}}
                className={card}
                title={'Chapters'}
                // extra={<Link to={'/chapters'}>View All</Link>}
            >
                <Scrollable>
                    {data.map(chapter => (
                        <Popover
                            key={chapter.title}
                            align={{
                                points: ['cc', 'cc']
                            }}
                            content={
                                <Card
                                    style={{width: 220, margin: `-12px -16px`}}
                                    bodyStyle={{padding: 8}}
                                    cover={<img alt={chapter.title} src={chapter.image}/>}
                                >
                                    <Card.Meta
                                        className={meta}
                                        title={chapter.title}
                                    />
                                </Card>
                            }
                        >
                            <img height="140" style={{cursor: 'pointer'}} src={chapter.image} alt={chapter.title}/>
                        </Popover>
                    ))}
                </Scrollable>
            </Card>
        </>
    );
}


export default Chapters;
