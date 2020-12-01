export class Location {
    /**
     * 获取当前城市信息。
     */
    static currentCity() {
        return new Promise(ok => {
            new window.BMap.LocalCity().get(async ({ name }) => {
                const res = await (await fetch('http://127.0.0.1:8080/area/info?name=' + name)).json();
                ok(res.body);
            })
        });
    }
}
