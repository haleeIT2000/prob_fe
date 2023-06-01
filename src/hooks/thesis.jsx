import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { THESIS_DETAIL, THESIS_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';
import { PAGE_SIZE } from '../constants';

export const useThesisList = (tableParams) => {
    var sort, sortColumn, limit, page, search;
    if (tableParams !== undefined) {
        sort = tableParams.sorter?.sort || 'desc'
        sortColumn = tableParams.sorter?.sortColumn || 'id'
        limit = tableParams.sorter?.pageSize || PAGE_SIZE
        page = tableParams.sorter?.current || 1
        search = tableParams.search
    }

    return useQuery([THESIS_LIST, sort, sortColumn, limit, page, search], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.THESIS.LIST}`,
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

export const useThesisDetail = (thesisId) => {
    return useQuery([THESIS_DETAIL, thesisId], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.THESIS.UPDATE}`.replace(':id', thesisId))

        return data;
    })
}

export const useThesisDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (thesisId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.THESIS.UPDATE.replace(":id", thesisId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(THESIS_LIST);
            },
        }
    );
};

export const useCreateThesis = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.THESIS.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(THESIS_LIST);
            },
        }
    );
};
export const useUpdateThesis = (thesisId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.THESIS.UPDATE}`.replace(':id', thesisId), data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(THESIS_LIST);
            },
        }
    );
};