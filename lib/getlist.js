const getList = async () => {
    const res = await fetch("/api/hello")
    const data = await res.json()

    return data;
}

export default getList;