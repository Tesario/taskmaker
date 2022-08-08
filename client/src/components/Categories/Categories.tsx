import React, { useEffect } from "react";
import { useUpdateBreadcrump } from "@/BreadcrumpProvider";
import { useAppSelector } from "@/hooks";
import { Navigate } from "react-router-dom";
import CategoryList from "./CategoryList/CategoryList";
import CategoryForm from "./CategoryForm/CategoryForm";

const Categories = () => {
  const BreadcrumpUpdateContext = useUpdateBreadcrump();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    BreadcrumpUpdateContext({
      routes: [{ title: "Categories" }],
    });
  }, []);

  if (!user) {
    return <Navigate to={"/unauthorized"} replace />;
  }

  return (
    <section id="categories">
      <div className="container">
        <div className="white-card grid">
          <CategoryList />
          <CategoryForm />
        </div>
      </div>
    </section>
  );
};

export default Categories;
