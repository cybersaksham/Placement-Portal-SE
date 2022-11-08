import nextConnect from 'next-connect';

const all = (middleware) => {
    return nextConnect().all(middleware);
}

const get = (middleware) => {
    return nextConnect().get(middleware);
}

const post = (middleware) => {
    return nextConnect().post(middleware);
}

const put = (middleware) => {
    return nextConnect().put(middleware);
}

const del = (middleware) => {
    return nextConnect().delete(middleware);
}

const router = nextConnect();

export default router;
export { all, get, post, put, del };