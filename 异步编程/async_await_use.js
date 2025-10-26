async function fetchData(url) {
    try {
        const response = await fetch(url, {
            method: 'POST', // 改为 POST 请求
            // headers: {
            //     'Content-Type': 'application/json', // 告诉服务器传输的是 JSON 格式数据
            // },
            // body: JSON.stringify(bodyData), // 将对象转成 JSON 字符串
        });
        // const data = await response.json();
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

fetchData("http://localhost:3000/api/singers/top5")
    .then((data) => {
        console.log("数据获取成功",data);
    })
    .catch(() => {
        console.log("数据获取失败");
    })


