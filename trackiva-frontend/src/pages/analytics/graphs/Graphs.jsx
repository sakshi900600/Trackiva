import React from "react";
import styles from "./Graphs.module.css";

import ApplicationStatusPie from "./pie-chart/ApplicationStatusPie";
import ApplicationFunnel from "./funnel-chart/ApplicationFunnel";
import ApplicationTrends from "./line-chart/ApplicationTrends";
import PlatformPerformanceBar from "./bar-chart/PlatformPerformanceBar";

const Graphs = ({ data, loading }) => {
  return (
    <div className={styles.container}>
      
      {/* Row 1 */}
      <div className={styles.row}>
        <div className={styles.cardWrapper}>
          <ApplicationStatusPie
            data={data?.statusDistribution}
            loading={loading}
          />
        </div>

        <div className={styles.cardWrapper}>
          <ApplicationFunnel
            data={data?.funnel}
            loading={loading}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className={styles.fullWidth}>
        <ApplicationTrends
          data={data?.trends}
          loading={loading}
        />
      </div>

      {/* Row 3 */}
      {/* <div className={styles.fullWidth}>
        <PlatformPerformanceBar
          data={data?.platforms}
          loading={loading}
        />
      </div> */}

    </div>
  );
};

export default Graphs;