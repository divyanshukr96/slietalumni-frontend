import React from 'react';
import {Button, notification} from "antd";

const semverGreaterThan = (versionA, versionB) => {
    if (!versionB) return true;
    const versionsA = versionA.split(/\./g);
    const versionsB = versionB.split(/\./g);

    while (versionsA.length || versionsB.length) {
        const a = Number(versionsA.shift());
        const b = Number(versionsB.shift());

        if (a === b) continue;
        return a > b || isNaN(b);
    }
    return false;
};


export default class CheckAppUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLatestVersion: false,
            latestVersion: null,
            refreshCacheAndReload: async () => {
                console.log('Clearing cache and hard reloading...');
                if (caches) {
                    // Service worker cache should be cleared with caches.delete()
                    await caches.keys().then(function (names) {
                        for (let name of names) caches.delete(name);
                    });
                    await this.setCurrentVersion(this.state.latestVersion);
                }
                // delete browser cache and hard reload
                window.location.reload(true);
            }
        };
    }

    setCurrentVersion = (latestVersion) => localStorage.setItem('appVersion', latestVersion);

    componentDidMount() {
        const currentVersion = localStorage.getItem('appVersion');
        fetch('/meta.json')
            .then((response) => response.json())
            .then((meta) => {
                const latestVersion = meta.version;
                this.setState({latestVersion});

                if (!currentVersion) return this.setCurrentVersion(latestVersion);

                const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion);

                if (shouldForceRefresh) {
                    console.log(`We have a new version - ${latestVersion}. Should update the cached data!`);
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
