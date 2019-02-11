/*global daum*/
export function daumMapInit(apiKey: string) {
    return new Promise((resolve, reject) => {
        const element = document.createElement('script');

        element.onload = function () {
            daum.maps.load(function () {
                resolve();
            })
        };

        element.onerror = function() {
            reject();
        };

        element["src"] = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
        document["body"].appendChild(element);
    })
}