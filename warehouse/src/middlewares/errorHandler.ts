export default function errorHandler(err:any, req:any, res:any, next:any) {
    console.log(err)
    const {message, status = 500} = err
    //respond with json
    res.status(status).json({status, message})
}
  