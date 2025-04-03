import { useEffect } from "react";
import { MainRouter } from "@/pages/router";
import { HashRouter } from "react-router-dom";

import "./App.css";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { APIResponseError } from "endpoint-client";
import mixpanel from "mixpanel-browser";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof APIResponseError) {
        if (error.body.code === "invalid_token") {
          localStorage.removeItem("accessToken");
          window.location.href = "/";
        }
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

// Mixpanel 초기화 (최초 1회만 실행)
mixpanel.init("2a55c684e4f33dc4db2be4cd973ef8b3", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
  autocapture: true, // enable autocapture
});

function App() {
  useEffect(() => {
    // FingerprintJS 로드 및 device_id 획득
    FingerprintJS.load().then(
      (fp: { get: () => Promise<{ visitorId: any }> }) => {
        fp.get().then((result: { visitorId: any }) => {
          const deviceId = result.visitorId; // 고유 device_id
          // device_id로 사용자 식별
          mixpanel.identify(deviceId);
          mixpanel.people.set({
            $name: deviceId, // 필요에 따라 추가 정보를 설정할 수 있음
            // 예: plan, country 등 추가 속성
          });
        });
      }
    );
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <MainRouter />
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
