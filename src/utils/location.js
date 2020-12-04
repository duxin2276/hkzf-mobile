export const CURRENT_CITY_KEY = 'CURRENT_CITY';

export class Location {
    static currentCity() {
        // 通过百度地图API获取本地的基本名字（城市名称）
        // 基于城市名字利用后端API换取可用城市信息（发请求）。
        return new Promise(ok => {
            // 拿到本地存储的数据：（有|没有[null]）
            const current = JSON.parse(localStorage.getItem(CURRENT_CITY_KEY));

            current ? ok(current) : new window.BMap.LocalCity().get(async ({ name }) => {
                const { body } = await (await fetch('http://127.0.0.1:8080/area/info?name=' + name)).json();
                localStorage[CURRENT_CITY_KEY] = JSON.stringify(body);
                ok(body);
            })
        });
    }

    static saveCity(city) {
        localStorage[CURRENT_CITY_KEY] = JSON.stringify(city);
    }
}
