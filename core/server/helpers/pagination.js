// ### Pagination Helper
// `{{pagination}}`
// Outputs previous and next buttons, along with info about the current page

var _               = require('lodash'),
    errors          = require('../errors'),
    i18n            = require('../i18n'),
    template        = require('./template'),
    pagination;

pagination = function (options) {
    /*jshint unused:false*/
    if (!_.isObject(this.pagination) || _.isFunction(this.pagination)) {
        throw new errors.IncorrectUsageError({
            message: i18n.t('warnings.helpers.pagination.invalidData')
        });
    }

    if (_.isUndefined(this.pagination.page) || _.isUndefined(this.pagination.pages) ||
        _.isUndefined(this.pagination.total) || _.isUndefined(this.pagination.limit)) {
        throw new errors.IncorrectUsageError({
            message: i18n.t('warnings.helpers.pagination.valuesMustBeDefined')
        });
    }

    if ((!_.isNull(this.pagination.next) && !_.isNumber(this.pagination.next)) ||
        (!_.isNull(this.pagination.prev) && !_.isNumber(this.pagination.prev))) {
        throw new errors.IncorrectUsageError({
            message: i18n.t('warnings.helpers.pagination.nextPrevValuesMustBeNumeric')
        });
    }

    if (!_.isNumber(this.pagination.page) || !_.isNumber(this.pagination.pages) ||
        !_.isNumber(this.pagination.total) || !_.isNumber(this.pagination.limit)) {
        throw new errors.IncorrectUsageError({message: i18n.t('warnings.helpers.pagination.valuesMustBeNumeric')});
    }

    var data = _.merge({}, this.pagination);

    return template.execute('pagination', data, options);
};

module.exports = pagination;
