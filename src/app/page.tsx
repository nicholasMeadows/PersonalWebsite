'use client'
import React, {useEffect} from 'react';
import {redirect, RedirectType} from "next/navigation";
import {WINDOWS_98_ROUTE} from "@/app/constants/routes";

function Page() {
    useEffect(() => {
        redirect(WINDOWS_98_ROUTE, RedirectType.replace);
    }, []);
    return (
        <></>
    );
}

export default Page;