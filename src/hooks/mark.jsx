import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MARK_LIST, MARK_DETAIL } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';
import { PAGE_SIZE } from '../constants';

export const useMarkList = (tableParams) => {
    var sort, sortColumn, limit, page, search;
    if (tableParams !== undefined) {
        sort = tableParams.sorter?.sort || 'desc'
        sortColumn = tableParams.sorter?.sortColumn || 'id'
        limit = tableParams.sorter?.pageSize || PAGE_SIZE
        page = tableParams.sorter?.current || 1
        search = tableParams.search
    }

    return useQuery([MARK_LIST, sort, sortColumn, limit, page, search], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.MARK.LIST}`,
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

export const useMarkDetail = (markId) => {
    return useQuery([MARK_DETAIL,markId], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.MARK.UPDATE}`.replace(':id', markId))

        return data;
    })
}

export const useMarkDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (markId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.MARK.UPDATE.replace(":id", markId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(MARK_LIST);
            },
        }
    );
};

export const useCreateMark = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.MARK.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(MARK_LIST);
            },
        }
    );
};

export const useUpdateMark = (markId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.MARK.UPDATE.replace(':id', markId)}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(MARK_LIST);
            },
        }
    );
};