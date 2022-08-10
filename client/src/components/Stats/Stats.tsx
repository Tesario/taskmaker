import React, { useEffect, useState } from "react";
import { useUpdateBreadcrump } from "@/BreadcrumpProvider";
import { useAppSelector } from "@/hooks";
import { Navigate } from "react-router-dom";
import { graphQLFetch } from "@/Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faHourglassEmpty,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@/ThemeProvider";

import "./Stats.scss";

interface StatsI {
  totalCount: number;
  completedCount: number;
  uncompletedCount: number;
  expiredCount: number;
}

const Stats = () => {
  const BreadcrumpUpdateContext = useUpdateBreadcrump();
  const user = useAppSelector((state) => state.auth.user);
  const [stats, setStats] = useState<StatsI | null>(null);
  const ThemeContext = useTheme();

  useEffect(() => {
    BreadcrumpUpdateContext({
      routes: [{ title: "Statistics" }],
    });

    const fetchTasks = async () => {
      const query = `query {
        taskStats {
          totalCount
          completedCount
          uncompletedCount
          expiredCount
        }
      }`;

      const data = await graphQLFetch(query);

      if (data) {
        setStats(data.taskStats);
      }
    };
    fetchTasks();
  }, []);

  if (!user) {
    return <Navigate to={"/unauthorized"} replace />;
  }

  return (
    <section id="stats" className={ThemeContext}>
      <div className="container">
        <div className="white-card">
          <div className="title">Personal statistics</div>
          <div className="grid">
            <div className="item">
              <div className="icon uncompleted">
                <FontAwesomeIcon icon={faThumbTack} />
              </div>
              <div className="desc">Uncompleted</div>
              <div className="number">{stats?.uncompletedCount || 0}</div>
            </div>
            <div className="item">
              <div className="icon completed">
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
              <div className="desc">Completed</div>
              <div className="number">{stats?.completedCount || 0}</div>
            </div>
            <div className="item">
              <div className="icon expired">
                <FontAwesomeIcon icon={faHourglassEmpty} />
              </div>
              <div className="desc">Expired</div>
              <div className="number">{stats?.expiredCount || 0}</div>
            </div>
          </div>
          <span className="divider"></span>
          <div className="item">
            <div className="desc">All tasks</div>
            <div className="number">{stats?.totalCount || 0}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
