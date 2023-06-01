import { CLASS_LIST, EXAM_LIST, EXPORT_FILE, STAFF_LIST, SUBJECT_LIST } from "../constants/QueryKey";
import axios from '../config/axios';
import API from '../constants/api';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useExportFile = (userId) => {

    return useQuery([EXPORT_FILE], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.FILE.EXPORT}`.replace(':id', userId),
            {
                params: {
                    sort: sort,
                    sortColumn: sortColumn,
                    limit: limit,
                    search,
                    offset: page == 1 ? page - 1 : page
                },
            })

        return { data, total: headers["x-total-count"] };
    })
}

export const useImportFile = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.FILE.IMPORT}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(STAFF_LIST);
                queryClient.invalidateQueries(SUBJECT_LIST);
                queryClient.invalidateQueries(CLASS_LIST);
            },
        }
    );
}