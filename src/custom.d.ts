// declare global {
//   namespace Express {
//     interface Request {
//       user: any; // Replace 'any' with the actual user data type
//     }
//   }
// }
interface CustomRequest extends Request {
  user: any; // Replace 'any' with the actual user data type
}
