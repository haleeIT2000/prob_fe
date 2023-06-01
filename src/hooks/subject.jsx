import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SUBJECT_DETAIL, SUBJECT_LIST, SUBJECT_LIST_ALL } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';
import { PAGE_SIZE } from '../constants';

export const useSubjectList = (tableParams) => {
    var sort, sortColumn, limit, page, search;
    if (tableParams !== undefined) {
        sort = tableParams.sorter?.sort || 'desc'
        sortColumn = tableParams.sorter?.sortColumn || 'id'
        limit = tableParams.sorter?.pageSize || PAGE_SIZE
        page = tableParams.sorter?.current || 1
        search = tableParams.search
    }
    return useQuery([SUBJECT_LIST, sort, sortColumn, limit, page, search], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.SUBJECT.LIST}`,
            {
                params: {
                    sort: sort,
                    sortColumn: sortColumn,
                    limit: limit,
                    offset: page == 1 ? page - 1 : page,
                    search,
                },
            })

        return { data, total: headers["x-total-count"] };
    })
}

export const useSubjectAll = () => {
    return useQuery([SUBJECT_LIST_ALL], async () => {
        const { data, headers } = await axios.get(`${API.API_ROOT}${API.SUBJECT.LIST}`)

        return { data, total: headers["x-total-count"] };
    })
}

export const useSubjectDetail = (subjectId) => {
    return useQuery([SUBJECT_DETAIL, subjectId], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.SUBJECT.UPDATE}`.replace(':id', subjectId))

        return data;
    })
}

export const useSubjectDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (subjectId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.SUBJECT.UPDATE.replace(":id", subjectId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(SUBJECT_LIST);
            },
        }
    );
};

export const useCreateSubject = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.SUBJECT.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(SUBJECT_LIST);
            },
        }
    );
};

export const useUpdateSubject = (subjectId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.SUBJECT.UPDATE.replace(":id", subjectId)}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(SUBJECT_LIST);
            },
        }
    );
};