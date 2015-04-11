/**
 * Created by christopherfricke on 4/10/15.
 */
/**
 * Factory for building route features as GeoJson
 * @param routeFeatureInfo
 * @constructor
 */
exports.RouteFeature = function(routeFeatureInfo){
    this.type = 'Feature';
    this.geometry = {};
    this.properties = {
        gid: undefined,
        name: undefined,
        seq: undefined,
        heading: undefined,
        costlength: undefined,
        costtime: undefined,
        source: undefined
    };

    for (var p in routeFeatureInfo){
        if (this.properties.hasOwnProperty(p) && p !== 'geometry'){
            this.properties[p] = routeFeatureInfo[p];
        } else if (p === 'geometry'){
            this.geometry = JSON.parse(routeFeatureInfo.geometry);
        }
    }
};