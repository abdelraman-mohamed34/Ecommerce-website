import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";

function Comments() {

    const [product, setProduct] = useState(null)
    useEffect(() => {
        const saved = localStorage.getItem('clickedProduct')
        setProduct(JSON.parse(saved))
    }, [])
    const { colors, color } = useSelector((state) => state.theme)
    const theme = colors[color]
    console.log(product?.reviews)
    if (!product?.reviews) return;
    return (
        <div className={`flex flex-col items-center py-10 px-4 sm:rounded-lg ${theme.cardBg}`}>
            <h1 className={`text-3xl font-bold mb-8 border-b-4 border-green-500 pb-2 ${theme.text}`}>
                comments
            </h1>

            <div className="w-full flex flex-col justify-start">
                {
                    product?.reviews.map((item) => (
                        <div
                            key={item.reviewerName}
                            className={` sm:p-6 flex items-start gap-4 transition-all duration-300 my-2`}
                        >
                            {item.avatar ? (
                                <img
                                    src={item.avatar}
                                    alt={item.reviewerName}
                                    className="w-12 h-12 rounded-full border-2 border-green-400"
                                />
                            ) : (
                                <RxAvatar size={50} />
                            )}

                            <div>
                                <div className="flex sm:flex-row flex-col justify-between items-start mb-2">
                                    <h2 className={`mr-1 font-semibold text-sm whitespace-nowrap ${theme.secondText}`}>{item.reviewerName} |</h2>
                                    <span className={`text-xs sm:flex hidden ${theme.disText}`}>{item.reviewerEmail}</span>
                                </div>
                                <Rating
                                    name="read-only"
                                    value={Math.floor(item.rating)}
                                    readOnly
                                    size="small"
                                    sx={{
                                        '& .MuiRating-iconEmpty': { color: '#919191' },
                                    }}
                                />
                                <p className={`leading-relaxed ${theme.text}`}>{item.comment}</p>
                            </div>
                        </div>
                    ))
                }
            </div >
        </div >
    );
}

export default Comments;
