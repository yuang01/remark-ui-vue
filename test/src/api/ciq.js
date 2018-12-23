import qs from 'qs';
import { fetch } from '../utils/axios';

export function getToken(data) {
  return fetch({
    url: '/token-auth',
    method: 'post',
    data: qs.stringify(data),
  });
}

export function verifyToken(data) {
  return fetch({
    url: '/token-verify',
    method: 'post',
    data: qs.stringify(data),
  });
}

export function getDashboards(params) {
  return fetch({
    url: '/dashboard',
    method: 'get',
    params,
  });
}

export function getInspections(params) {
  return fetch({
    url: '/unagriproduct',
    method: 'get',
    params,
  });
}

export function getRiskFoods(params) {
  return fetch({
    url: '/riskwarn',
    method: 'get',
    params,
  });
}


export function getRecalls(params) {
  return fetch({
    url: '/recall',
    method: 'get',
    params,
  });
}

export function getDefectRecalls(params) {
  return fetch({
    url: '/official_recall',
    method: 'get',
    params,
  });
}

export function getEpidemics(params) {
  return fetch({
    url: '/epidemic_situation',
    method: 'get',
    params,
  });
}

export function getRecallInfos(params) {
  return fetch({
    url: '/recallInfo',
    method: 'get',
    params,
  });
}

export function getRiskInfos(params) {
  return fetch({
    url: '/riskInfo',
    method: 'get',
    params,
  });
}

export function getLawsRegulations(params) {
  return fetch({
    url: '/lawsRegulations',
    method: 'get',
    params,
  });
}

export function getNormInfos(params) {
  return fetch({
    url: '/normInfo',
    method: 'get',
    params,
  });
}

export function getRiskIndustrys(params) {
  return fetch({
    url: '/riskIndustry',
    method: 'get',
    params,
  });
}

export function getRiskBrands(params) {
  return fetch({
    url: '/brands',
    method: 'get',
    params,
  });
}

export function getBrandDetails(params, guid) {
  return fetch({
    url: `/brand/${guid}/`,
    method: 'get',
    params,
  });
}

export function getBrandDetailsGoods(params, guid) {
  return fetch({
    url: `/brand/${guid}/goods`,
    method: 'get',
    params,
  });
}

export function getBrandDetailsComments(params, guid) {
  return fetch({
    url: `/brand/${guid}/comments`,
    method: 'get',
    params,
  });
}

export function getProductViews(params) {
  return fetch({
    url: '/industries',
    method: 'get',
    params,
  });
}

export function getTotalLists(params) {
  return fetch({
    url: '/riskList',
    method: 'get',
    params,
  });
}

export function getSoaringLists(params) {
  return fetch({
    url: '/soaringList',
    method: 'get',
    params,
  });
}

export function getRecentlyUpdates(params) {
  return fetch({
    url: '/recentlyUpdate',
    method: 'get',
    params,
  });
}

export function getHeatLists(params) {
  return fetch({
    url: '/heatList',
    method: 'get',
    params,
  });
}

export function getNewLists(params) {
  return fetch({
    url: '/newList',
    method: 'get',
    params,
  });
}

export function getIndustryManages(params) {
  return fetch({
    url: '/zdIndustry',
    method: 'get',
    params,
  });
}

export function updateZdIndustry(params) {
  return fetch({
    url: '/updateZdIndustry',
    method: 'get',
    params,
  });
}

export function getSaveIndustrys(params) {
  return fetch({
    url: '/saveIndustry',
    method: 'get',
    params,
  });
}

export function getRiskBrandLists(params) {
  return fetch({
    url: '/riskBrandByIndustry',
    method: 'get',
    params,
  });
}

export function getExportRecallInfo(params) {
  return fetch({
    url: '/export',
    method: 'get',
    params,
  });
}

export function getExportRisks(params) {
  return fetch({
    url: '/charts/export',
    method: 'get',
    params,
  });
}

export function getImportRisks(params) {
  return fetch({
    url: '/charts/import',
    method: 'get',
    params,
  });
}

export function getUsers(params) {
  return fetch({
    url: '/users',
    method: 'get',
    params,
  });
}

export function getUsersAdd(data) {
  return fetch({
    url: '/user/add',
    method: 'post',
    data: qs.stringify(data),
  });
}

export function getUsersUpd(data, id) {
  return fetch({
    url: `/user/edit/${id}/`,
    method: 'post',
    data: qs.stringify(data),
  });
}

export function getUsersDel(data, id) {
  return fetch({
    url: `/user/delete/${id}/`,
    method: 'DELETE',
    data: qs.stringify(data),
  });
}

export default {};
