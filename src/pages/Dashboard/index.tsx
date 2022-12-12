import React from "react";
import { useParams } from "react-router-dom";

export const Dashboard = () => {
    const { name } = useParams();

    return (
        <div className="flex flex-col w-full">
            <h1>{name}</h1>
        </div>
    )
}