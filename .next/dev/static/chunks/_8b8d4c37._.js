(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/api/deals.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dealsApi",
    ()=>dealsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/axios.ts [app-client] (ecmascript)");
;
const dealsApi = {
    getAll: async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/deals");
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Failed to fetch deals:", error);
            return [];
        }
    },
    getById: async (id)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/deals/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch deal ${id}:`, error);
            return null;
        }
    },
    create: async (deal)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/deals", deal);
            return response.data;
        } catch (error) {
            console.error("Failed to create deal:", error);
            return null;
        }
    },
    update: async (id, deal)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/deals/${id}`, deal);
            return response.data;
        } catch (error) {
            console.error(`Failed to update deal ${id}:`, error);
            return null;
        }
    },
    updateStage: async (id, stage)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`/deals/${id}/stage`, {
                stage
            });
            return response.data;
        } catch (error) {
            console.error(`Failed to update deal stage for ${id}:`, error);
            return null;
        }
    },
    delete: async (id)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/deals/${id}`);
            return true;
        } catch (error) {
            console.error(`Failed to delete deal ${id}:`, error);
            return false;
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/deals/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DealsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$deals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/deals.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function DealsPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [deals, setDeals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DealsPage.useEffect": ()=>{
            const fetchDeals = {
                "DealsPage.useEffect.fetchDeals": async ()=>{
                    try {
                        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$deals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dealsApi"].getAll();
                        setDeals(Array.isArray(data) ? data : []);
                    } catch (error) {
                        console.error("Failed to fetch deals:", error);
                        setDeals([]);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["DealsPage.useEffect.fetchDeals"];
            fetchDeals();
        }
    }["DealsPage.useEffect"], []);
    const getDealsByStage = (stage)=>{
        return deals.filter((deal)=>deal.stage === stage);
    };
    const getStageColor = (stage)=>{
        switch(stage){
            case "Lead":
                return "bg-gray-50 border-gray-300";
            case "Contacted":
                return "bg-blue-50 border-blue-300";
            case "Proposal":
                return "bg-yellow-50 border-yellow-300";
            case "Negotiation":
                return "bg-orange-50 border-orange-300";
            case "Won":
                return "bg-green-50 border-green-300";
            case "Lost":
                return "bg-red-50 border-red-300";
            default:
                return "bg-gray-50 border-gray-300";
        }
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-gray-600",
                children: "Loading deals..."
            }, void 0, false, {
                fileName: "[project]/app/deals/page.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/deals/page.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-semibold text-gray-900",
                children: "Deals Pipeline"
            }, void 0, false, {
                fileName: "[project]/app/deals/page.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 overflow-x-auto pb-4",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEAL_STAGES"].map((stage)=>{
                    const stageDeals = getDealsByStage(stage);
                    const totalValue = stageDeals.reduce((sum, deal)=>sum + deal.value, 0);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 w-80",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white border border-gray-200 rounded",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 py-3 border-b border-gray-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-sm font-semibold text-gray-900",
                                                    children: stage
                                                }, void 0, false, {
                                                    fileName: "[project]/app/deals/page.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-medium text-gray-500",
                                                    children: stageDeals.length
                                                }, void 0, false, {
                                                    fileName: "[project]/app/deals/page.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/deals/page.tsx",
                                            lineNumber: 74,
                                            columnNumber: 19
                                        }, this),
                                        totalValue > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-gray-500 mt-1",
                                            children: [
                                                "$",
                                                totalValue.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/deals/page.tsx",
                                            lineNumber: 78,
                                            columnNumber: 38
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/deals/page.tsx",
                                    lineNumber: 73,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 space-y-3 min-h-[400px] max-h-[600px] overflow-y-auto",
                                    children: stageDeals.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center text-gray-400 text-sm py-8",
                                        children: "No deals"
                                    }, void 0, false, {
                                        fileName: "[project]/app/deals/page.tsx",
                                        lineNumber: 82,
                                        columnNumber: 21
                                    }, this) : stageDeals.map((deal)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>router.push(`/deals/${deal.id}`),
                                            className: `p-4 border rounded cursor-pointer hover:shadow-md transition-shadow ${getStageColor(stage)}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-medium text-gray-900 mb-2",
                                                    children: deal.title
                                                }, void 0, false, {
                                                    fileName: "[project]/app/deals/page.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-semibold text-gray-900 mb-2",
                                                    children: [
                                                        "$",
                                                        deal.value.toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/deals/page.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-600",
                                                    children: deal.customerName
                                                }, void 0, false, {
                                                    fileName: "[project]/app/deals/page.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, deal.id, true, {
                                            fileName: "[project]/app/deals/page.tsx",
                                            lineNumber: 85,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/deals/page.tsx",
                                    lineNumber: 80,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/deals/page.tsx",
                            lineNumber: 72,
                            columnNumber: 15
                        }, this)
                    }, stage, false, {
                        fileName: "[project]/app/deals/page.tsx",
                        lineNumber: 71,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/deals/page.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/deals/page.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(DealsPage, "uLDDNasSPv4b6WmSL9IgJpUZjJo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DealsPage;
var _c;
__turbopack_context__.k.register(_c, "DealsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_8b8d4c37._.js.map