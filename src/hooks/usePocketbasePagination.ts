import { useState, useEffect } from "react";
import { pb } from "../api/pocketbase";

type usePocketbasePaginationProps = {
    collectionName: string,
    quantityPerPage: number,
}

type usePocketbasePaginationResponse<T> = {
    next: Function,
    prev: Function,
    goto: Function,
    items: T[],
    page: number,
    totalPages: number
}

export const usePocketbasePagination = <T> ({
    collectionName,
    quantityPerPage
} : usePocketbasePaginationProps): usePocketbasePaginationResponse<T>  => {
    const [fetchTotalPages, setFetchTotalPages] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>();
    const [items, setItems] = useState<T[]>();

    useEffect(() => {
        pb.collection(collectionName).getList<T>(currentPage, quantityPerPage).then((res) => {
            if (!fetchTotalPages) {
                setTotalPages(Math.round(res.totalItems / quantityPerPage))            
                setFetchTotalPages(true); //Flag to not fetch total pages again
            }
            setItems(res.items); //First load
        })        
    }, [currentPage])

    function next() {        
        setCurrentPage(totalPages && currentPage >= totalPages ? totalPages : currentPage + 1)
    }

    function prev() {        
        setCurrentPage(currentPage <= 0 ? 1 : currentPage - 1);
    }

    function goto(gotoPage: number) {        
        if (totalPages && gotoPage > totalPages || gotoPage <= 0) return;

        setCurrentPage(gotoPage);
    }

    return {
        next: next,
        prev: prev,
        goto: goto,
        items: items,        
        page: currentPage,
        totalPages: totalPages
    } as usePocketbasePaginationResponse<T>;
}