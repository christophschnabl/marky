const getUrl = function(port) {
    const protocol = location.protocol;
    const slashes = protocol.concat("//");
    const host = slashes.concat(window.location.hostname);
    console.log(host);

    return `${host}:${port}`;
}

module.exports = {
    URL: getUrl,
};