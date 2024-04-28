'use client'
import React, {useEffect} from 'react';
import {redirect, RedirectType} from "next/navigation";
import {HOME_ROUTE} from "@/app/constants/routes";

function Page() {
    useEffect(() => {
        redirect(HOME_ROUTE, RedirectType.replace);
    }, []);
    return (
        <></>
    );
}

export default Page;