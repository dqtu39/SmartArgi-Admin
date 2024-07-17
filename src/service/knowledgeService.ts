import { axiosInstance } from '@/providers/data/axios'; // Update this import path as needed

export interface KnowledgeUploadResponse {
    // Define the response structure based on your API
    success: boolean;
    message: string;
    // Add any other fields returned by your API
}

axiosInstance.defaults.baseURL = 'http://localhost:8000';

export interface KnowledgeItem {
    title: string;
    language: string;
    source: string;
}

export interface GetAllDocumentsResponse {
    total: number;
    documents: KnowledgeItem[];
}

export const getAllDocuments = async (): Promise<GetAllDocumentsResponse> => {
    const response = await axiosInstance.get('/api/v1/docs/getAllDocuments?collection=algo_documents');
    return response.data;
};
export const uploadText = async (text: string, title: string): Promise<any> => {
    const response = await axiosInstance.post('/api/v1/docs/uploadText', {document_title:title, document_text: text });
    return response.data;
};

export const uploadFile = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('document_file', file);
    const response = await axiosInstance.post('/api/v1/docs/uploadFile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const uploadLink = async (link: string): Promise<any> => {
    const response = await axiosInstance.post('/api/v1/docs/uploadLink', { document_link: link });
    return response.data;
};