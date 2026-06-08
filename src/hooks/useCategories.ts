"use client";

import { useState, useEffect, useCallback } from "react";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/category.type";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await categoryService.getAllCategories();

    if (error) {
      setError(error.message);
      setCategories([]);
    } else {
      setCategories(data || []);
      setError(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => fetchCategories());
  }, [fetchCategories]);

  return { categories, isLoading, error, refresh: fetchCategories };
}
