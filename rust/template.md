---
uid: {{uid}}
hash: {{hash}}
rating: {{rating}}
created: {{created}}
categories:
{{#each categories}}
  - {{this}}
{{/each}}
---

# {{name}}

Categories: {{#each categories}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

Via [{{source}}]({{source_url}}).

![photo]({{image_url}})

## Description
{{#if servings}}
    {{servings}}
{{/if}}
{{#if description}}
    {{description}}
{{/if}}
{{#if notes}}
    {{notes}}
{{/if}}

## Ingredients
{{newlines_to_bullets ingredients}}

## Directions
{{directions}}

## Nutritional Info
{{nutritional_info}}