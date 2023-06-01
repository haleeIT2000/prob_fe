import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TOPIC_DETAIL, TOPIC_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';
import { PAGE_SIZE } from '../constants';

export const useTopicList = (tableParams) => {
    var sort, sortColumn, limit, page, search, userId;
    if (tableParams !== undefined) {
        sort = tableParams.sorter?.sort || 'desc'
        sortColumn = tableParams.sorter?.sortColumn || 'id'
        limit = tableParams.pagination?.pageSize || PAGE_SIZE
        page = tableParams.pagination?.current || 1
        search = tableParams.search
        userId = tableParams.userId
    }

    return useQuery([TOPIC_LIST, sort, sortColumn, limit, page, search, userId], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.TOPIC.LIST}`,
            {
                params: {
                    sort: sort,
                    sortColumn: sortColumn,
                    limit: limit,
                    search,
                    user_id: userId,
                    offset: page == 1 ? page - 1 : page
                },
            })

        return { data, total: headers["x-total-count"] };
    })
}

export const useTopicDetail = (topicId) => {
    return useQuery([TOPIC_DETAIL, topicId], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.TOPIC.UPDATE}`.replace(':id', topicId))

        return data;
    })
}

export const useTopicDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (topicId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.TOPIC.UPDATE.replace(":id", topicId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(TOPIC_LIST);
            },
        }
    );
};

export const useCreateTopic= () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.TOPIC.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(TOPIC_LIST);
            },
        }
    );
};

export const useUpdateTopic = (topicId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.TOPIC.UPDATE}`.replace(':id', topicId), data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(TOPIC_LIST);
            },
        }
    );
};