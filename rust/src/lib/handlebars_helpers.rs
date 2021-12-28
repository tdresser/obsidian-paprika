use handlebars::{Helper, Handlebars, Context, RenderContext, Output, HelperResult, JsonRender};

pub fn newlines_to_bullets(h: &Helper, _: &Handlebars, _: &Context, rc: &mut RenderContext, out: &mut dyn Output) -> HelperResult {
    let param = h.param(0).unwrap();
    let bulleted = param.value().render().lines()
        .map(|x| "- ".to_string() + x)
        .collect::<Vec<_>>()
        .join("\n");
    out.write(&bulleted)?;
    Ok(())
}