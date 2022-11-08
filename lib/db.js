import mongoose from 'mongoose'

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.ffxxqrq.mongodb.net/placement-portal?retryWrites=true&w=majority`

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    try {
        if (cached.conn) {
            return cached.conn
        }

        if (!cached.promise) {
            const opts = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }

            cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
                return mongoose
            })
        }
        cached.conn = await cached.promise
        console.log("Database connected");
        return cached.conn
    } catch (e) {
        console.log(e);
        throw new Error("Database not connected");
    }
}

export default dbConnect;