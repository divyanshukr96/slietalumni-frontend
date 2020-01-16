import React from 'react';
import packageJson from '../../package.json';
import {Button, notification} from "antd";

global.appVersion = packageJson.version;

const semverGreaterThan = (versionA, versionB) => {
    const versionsA = versionA.split(/\./g);

    const versionsB = versionB.split(/\./g);
    while (versionsA.length || versionsB.length) {
        const a = Number(versionsA.shift());

        const b = Number(versionsB.shift());

        if (a === b) continue;
        return a < b || isNaN(b);
    }
    return false;
};


export default class CheckAppUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLatestVersion: false,
            refreshCacheAndReload: () => {
                console.log('Clearing cache and hard reloading...');
                if (caches) {
                    // Service worker cache should be cleared with caches.delete()
                    caches.keys().then(function (names) {
                        for (let name of names) caches.delete(name);
                    });
                }
                // delete browser cache and hard reload
                window.location.reload(true);
            }
        };
    }

    componentDidMount() {
        fetch('/meta.json')
            .then((response) => response.json())
            .then((meta) => {
                const latestVersion = meta.version;
                const currentVersion = global.appVersion;

                const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion);

                if (shouldForceRefresh) {
                    console.log(`We have a new version - ${latestVersion}. Should force refresh`);
                    this.setState({loading: false, isLatestVersion: false});
                } else {
                    console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`);
                    this.setState({loading: false, isLatestVersion: true});
                }
            }).catch(err => err);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const {loading, isLatestVersion, refreshCacheAndReload} = this.state;

        if (!loading && !isLatestVersion) notification.info({
            message: 'Update is available',
            description: <Button
                style={{paddingLeft: 0}}
                type={"link"}
                onClick={refreshCacheAndReload}
            >Click here to Update page</Button>,
            placement: 'topRight',
            duration: 0,
        });
    }

    render() {
        return null;
    }
}
