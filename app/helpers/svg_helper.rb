# frozen_string_literal: true

# grab font awesome svgs from app/assets/svgs
# strip unused attributes, but expose the raw svg html
# so that svgs can be easily styled
module SvgHelper
  SVG_ATTRS_TO_REMOVE = ['aria-hidden', 'data-prefix', 'data-icon', 'role', 'class'].freeze
  PATH_ATTRS_TO_REMOVE = ['class', 'fill'].freeze

  SVG_MAP = Dir["#{Rails.root}/app/assets/svgs/*"].map do |file_path|
    name = File.basename(file_path).gsub(/\.svg$/, '')

    svg = Nokogiri::HTML(File.open(file_path).read).css('svg')[0]

    SVG_ATTRS_TO_REMOVE.each {|a| svg.attributes[a]&.remove() }

    path = svg.css('path')[0]

    PATH_ATTRS_TO_REMOVE.each {|p| path.attributes[p]&.remove() }

    [name, svg.to_html]
  end.to_h.with_indifferent_access.freeze

  def self.svgs_to_json
    binding.pry
    SVG_MAP.to_json
  end

  def svg_tag(name)
    SVG_MAP[name]
  end
end
