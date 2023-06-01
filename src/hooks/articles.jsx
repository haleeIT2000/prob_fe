import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ARTICLE_DETAIL, ARTICLE_LIST } from '../constants/QueryKey';
import axios from '../config/axios';
import API from '../constants/api';
import { PAGE_SIZE } from '../constants';

export const useArticleList = (tableParams) => {
    var sort, sortColumn, limit, page, search, userId;
    if (tableParams !== undefined) {
        sort = tableParams.sorter?.sort || 'desc'
        sortColumn = tableParams.sorter?.sortColumn || 'id'
        limit = tableParams.pagination?.pageSize || PAGE_SIZE
        page = tableParams.pagination?.current || 1
        search = tableParams.search
        userId = tableParams.userId
    }

    return useQuery([ARTICLE_LIST, sort, sortColumn, limit, page, search, userId], async () => {
        const { data, headers } = await axios.get(
            `${API.API_ROOT}${API.ARTICLE.LIST}`,
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

export const useArticleDetail = (ArticleId) => {
    return useQuery([ARTICLE_DETAIL,ArticleId], async () => {
        const { data } = await axios.get(`${API.API_ROOT}${API.ARTICLE.UPDATE}`.replace(':id', ArticleId))

        return data;
    })
}

export const useArticleDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (ArticleId) => {
            return await axios.delete(
                `${API.API_ROOT}${API.ARTICLE.UPDATE.replace(":id", ArticleId)}`
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(ARTICLE_LIST);
            },
        }
    );
};

export const useCreateArticle = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.post(`${API.API_ROOT}${API.ARTICLE.LIST}`, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(ARTICLE_LIST);
            },
        }
    );
};

export const useUpdateArticle = (ArticleId) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => {
            return await axios.put(`${API.API_ROOT}${API.ARTICLE.UPDATE}`.replace(':id', ArticleId), data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(ARTICLE_LIST);
            },
        }
    );
};