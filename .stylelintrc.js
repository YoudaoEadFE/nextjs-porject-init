module.exports = {
  extends: ['stylelint-config-standard'],
  customSyntax: 'postcss-less',
  rules: {
    'no-missing-end-of-source-newline': null,
    //  不能使用@
    'at-rule-no-unknown': null,
    // rgba不能使用百分比
    'alpha-value-notation': null,
    // 类选择器模式
    'selector-class-pattern': null,
    // 规则前空行
    'rule-empty-line-before': null,
    // 评论前空行
    'comment-empty-line-before': null,
    // 不允许降序声明
    'no-descending-specificity': null,
    // 现代方式声明rgba
    'color-function-notation': null,
    // 引用标准化
    'import-notation': null,
    // 不使用id
    'selector-id-pattern': null,
    // 不许使用-开头属性
    'property-no-vendor-prefix': null,
    // @规则不许使用-
    'at-rule-no-vendor-prefix': null,
    // 不能使用@global
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};
