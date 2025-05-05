import { reviewToDb, updatedProfileToDb } from "@/utils/post/post.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useReview = () => {
  return useMutation({
    mutationKey: ["REVIEW"],
    mutationFn: async (data: any) => await reviewToDb(data),
    onSuccess: (data) => {
      toast.success("Review successfully completed");
    },
    onError: (data: any) => {
      toast.error(data?.details?.error || "Review added Failed");
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['UPDATE_PROFILE'],
    mutationFn: updatedProfileToDb,
    onSuccess: (data) => {
      queryClient.setQueryData(['PROFILE'], data);
      toast.success('Profile updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error?.message || 'Profile update failed');
      queryClient.invalidateQueries({ queryKey: ['PROFILE'] });
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['PROFILE'] });
      const previousProfile = queryClient.getQueryData(['PROFILE']);
    
      queryClient.setQueryData(['PROFILE'], (old: any) => ({
        ...old,
        ...newData
      }));
      
      return { previousProfile };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['PROFILE'] });
    }
  });
};
