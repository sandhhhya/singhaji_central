import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
// import { array } from 'yup/lib/locale';

export default function SkeletonColor() {
    let arr = [1, 1, 1, 1, 1, 1, 1];
    return (
        <>
            <div className='d-flex justify-content-between'>


                <Skeleton className='ml-4'
                    sx={{ bgcolor: "rgb(222, 222, 222)" }}
                    variant="rectangular"
                    style={{ height: "30px", width: "120px", borderRadius: '3px' }}
                />




                <Skeleton className='mr-5'
                    sx={{ bgcolor: "rgb(222, 222, 222)" }}
                    variant="rectangular"
                    style={{ height: "30px", width: "200px", borderRadius: '3px' }}
                />
            </div>
            <Skeleton className='ml-3 '
                sx={{ bgcolor: "rgb(222, 222, 222)" }}
                variant="rectangular"
                style={{ width: '97%', height: "7%", borderRadius: '3px', marginTop: '15px' }}
            />
            {
                arr.map((e, i) => {

                    return (
                        <Skeleton key={i} className='ml-3 mt-3'
                            sx={{ bgcolor: "rgb(222, 222, 222)" }}
                            variant="rectangular"
                            style={{ width: '97%', height: "7%", borderRadius: '3px' }}
                        />
                    )
                })


            }
            <div className='d-flex justify-content-between'>


                <Skeleton className='ml-4 mt-3'
                    sx={{ bgcolor: "rgb(222, 222, 222)" }}
                    variant="rectangular"
                    style={{ height: "25px", width: "200px", borderRadius: '3px' }}
                />




                <Skeleton className='mr-3 mt-3'
                    sx={{ bgcolor: "rgb(222, 222, 222)" }}
                    variant="rectangular"
                    style={{ height: "30px", width: "200px", borderRadius: '3px' }}
                />
            </div>



        </>
    );
}
