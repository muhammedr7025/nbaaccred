import { useAuth } from "@/components/AuthContext";
import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
export function TokenVerify() {
    let { accessToken } = useParams();
    console.log(accessToken)
    return (
        <></>
    );
}

export default TokenVerify;
