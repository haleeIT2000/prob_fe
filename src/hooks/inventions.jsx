import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { INVENTIONS_DETAIL, INVENTIONS_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';
import { PAGE_SIZE } from '../constants';

export const useInventionList = (tableParams) => {
    var sort, sortColumn, limit, page, search;
    if (tableParams !== undefined) {
        sort = tableParams.sorter?.sort || 'desc'
        sortColumn = tableParams.sorter?.sortColumn || 'id'
        limit = tableParams.sorter?.pageSize || PAGE_SIZE
        page = tableParams.sorter?.current || 1
        search = tableParams.search
    }

    return useQuery([INVENTIONS_LIST, sort, sortColumn, limit, page, search], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.INVENTIONS.LIST}`,
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

export const useInventionsDetail = (InventionsId) => {
    return useQuery([INVENTIONS_DETAIL,InventionsId], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.INVENTIONS.UPDATE}`.replace(':id', InventionsId))

        return data;
    })
}

export const useInventionsDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (InventionsId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.INVENTIONS.UPDATE.replace(":id", InventionsId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(INVENTIONS_LIST);
            },
        }
    );
};

export const useCreateInventions = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.INVENTIONS.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(INVENTIONS_LIST);
            },
        }
    );
};

export const useUpdateInventions = (InventionsId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.INVENTIONS.UPDATE}`.replace(':id', InventionsId), data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(INVENTIONS_LIST);
            },
        }
    );
};