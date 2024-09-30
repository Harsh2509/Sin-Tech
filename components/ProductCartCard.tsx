// export default function ProductCartCard() {
//   return (
//     <div className="max-w-sm mx-auto my-6">
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         {product && (
//           <>
//             <img
//               className="w-full h-48 object-cover"
//               src={product.image}
//               alt={product.title}
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 {product.title}
//               </h2>
//               <p className="text-gray-600 mt-2">{product.description}</p>
//               <p className="text-gray-800 mt-4 font-bold">
//                 ${price.toFixed(2)}
//               </p>
//               <p className="text-sm text-gray-600">
//                 Category: {product.category}
//               </p>
//               <div className="flex items-center mt-2">
//                 <span className="text-yellow-500 flex">
//                   {Array(Math.round(product.rating.rate))
//                     .fill("")
//                     .map((_, i) => (
//                       <svg
//                         key={i}
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         className="h-4 w-4"
//                       >
//                         <path d="M12 .587l3.668 7.431 8.199 1.191-5.938 5.788 1.4 8.167-7.329-3.85-7.329 3.85 1.4-8.167L.133 9.209l8.199-1.191z" />
//                       </svg>
//                     ))}
//                 </span>
//                 <span className="text-gray-600 ml-2">
//                   ({product.rating.count} reviews)
//                 </span>
//               </div>
//               <div className="flex justify-between mt-4">
//                 <div className="flex items-center">
//                   <button
//                     className="text-lg font-bold px-3 py-1 bg-gray-200 rounded-l"
//                     onClick={() => updateQuantity(quantity - 1)}
//                     disabled={quantity === 1}
//                   >
//                     -
//                   </button>
//                   <span className="text-lg px-4">{quantity}</span>
//                   <button className="text-lg font-bold px-3 py-1 bg-gray-200 rounded-r">
//                     +
//                   </button>
//                 </div>
//                 <a href="/cart">
//                   <button className="bg-red-600 px-4 py-2 rounded-md text-white cursor-pointer hover:bg-red-500">
//                     Remove from cart
//                   </button>
//                 </a>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
