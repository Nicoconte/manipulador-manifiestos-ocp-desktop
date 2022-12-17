import { useState, useEffect } from "react";
import { pb } from "../api/pocketbase";
import { getPocketbaseErrorMessage } from "../helpers/pocketbase.helper";

type usePocketbasePaginationProps = {
    collectionName: string,
    quantityPerPage: number,
    filter: string
    setLoading: (value: boolean) => void,
    onError: (err: string) => void
}

type usePocketbasePaginationResponse<T> = {
    next: () => void,
    prev: () => void,
    goto: (pageNumber: number) => void,
    items: T[],
    page: number,
    totalPages: number,
}

export const usePocketbasePagination = <T> ({
    collectionName,
    quantityPerPage,
    filter,
    setLoading,
    onError
} : usePocketbasePaginationProps): usePocketbasePaginationResponse<T>  => {
    const [fetchTotalPages, setFetchTotalPages] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>();
    const [items, setItems] = useState<T[]>();

    useEffect(() => {
        setLoading(true);

        pb.collection(collectionName).getList<T>(currentPage, quantityPerPage, {
            filter: filter
        }).then((res) => {
            if (!fetchTotalPages) {
                let pagesCalcResult = Math.round(res.totalItems / quantityPerPage);
                setTotalPages(pagesCalcResult === 0 ? 1 : pagesCalcResult)            
                setFetchTotalPages(true); //Flag to not fetch total pages again
            }
            setItems(res.items); //First load
        })
        .catch(err => {
            onError(getPocketbaseErrorMessage(err));
        })
        .finally(() => {
            setLoading(false);
        })

    }, [currentPage])

    function next() {        
        setCurrentPage(prev => totalPages && prev >= totalPages ? totalPages : prev + 1)
    }

    function prev() {        
        setCurrentPage(prev => prev - 1 <= 0 ? 1 : prev - 1);
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